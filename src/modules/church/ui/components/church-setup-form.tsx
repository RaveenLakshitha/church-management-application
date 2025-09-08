'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

// Mock user data (replace with your auth context or hook)
const loggedInUser = {
  name: 'John Doe', // Fetched from login
  email: 'john.doe@example.com', // Fetched from login
}

// Define Role enum based on user model
enum Role {
  SUBACCOUNT_USER = 'SUBACCOUNT_USER',
  ADMIN = 'ADMIN',
  // Add other roles as needed
}

// Define schema for Step 0 (User Details)
const userDetailsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  image: z
    .any()
    .optional()
    .refine((files) => !files || files.length === 1, 'Please upload a single image')
    .refine((files) => {
      if (!files?.[0]) return true
      const fileType = files[0].type
      return ['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)
    }, 'Image must be a PNG, JPG, or JPEG file'),
  role: z.enum([Role.SUBACCOUNT_USER, Role.ADMIN], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }).default(Role.SUBACCOUNT_USER),
  missionStatement: z.string().min(1, 'Mission statement is required'),
})

// Define schema for Step 1 (Church Details)
const churchDetailsSchema = z.object({
  name: z.string().min(1, 'Church name is required'),
  churchLogo: z
    .any()
    .refine((files) => files?.length === 1, 'Please upload a church logo')
    .refine((files) => {
      if (!files?.[0]) return true
      const fileType = files[0].type
      return ['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)
    }, 'Logo must be a PNG, JPG, or JPEG file'),
  companyEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  companyPhone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number').min(1, 'Phone number is required'),
  whitelabel: z.boolean().default(true),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code').min(1, 'ZIP code is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  goal: z.number().int().min(1, 'Goal must be a positive integer'),
})

type UserDetailsFormData = z.infer<typeof userDetailsSchema>
type ChurchDetailsFormData = z.infer<typeof churchDetailsSchema>
type FormData = UserDetailsFormData & ChurchDetailsFormData

export const ChurchSetupForm = () => {
  const [step, setStep] = useState(0)
  const totalSteps = 2

  // Initialize form with Zod resolver
  const form = useForm<FormData>({
    resolver: zodResolver(step === 0 ? userDetailsSchema : churchDetailsSchema),
    defaultValues: {
      // Step 0: User Details
      name: loggedInUser.name,
      email: loggedInUser.email,
      image: null,
      role: Role.SUBACCOUNT_USER,
      missionStatement: '',
      // Step 1: Church Details
      churchLogo: null,
      companyEmail: '',
      companyPhone: '',
      whitelabel: true,
      address: '',
      city: '',
      zipCode: '',
      state: '',
      country: '',
      goal: 5,
    },
  })

  const { handleSubmit, control, reset } = form

  const onSubmit = async (formData: FormData) => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      console.log(formData)
      setStep(0)
      reset()
      toast.success('Form successfully submitted')
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Shape */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-slate-200/30 to-slate-400/20 rounded-full blur-3xl opacity-50 transform rotate-45" />
        <div className="absolute -bottom-60 -right-40 w-[800px] h-[800px] bg-gradient-to-tr from-slate-300/20 to-slate-500/10 rounded-full blur-3xl opacity-40 transform -rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            Church Setup
          </h1>
          <p className="text-slate-600 text-lg font-medium">Configure your church profile in a few simple steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="relative">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-out',
                    index <= step
                      ? 'bg-gradient-to-r from-slate-700 to-slate-600 border-slate-700 text-white shadow-lg'
                      : 'bg-white border-slate-200 text-slate-400'
                  )}
                >
                  {index < step ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                {index <= step && (
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-slate-700/20 to-slate-600/20 blur animate-pulse" />
                )}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    'w-24 h-0.5 mx-4 transition-all duration-500 ease-out',
                    index < step
                      ? 'bg-gradient-to-r from-slate-700 to-slate-600'
                      : 'bg-slate-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-slate-100/50 px-8 py-6">
            <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">{step + 1}</span>
              </div>
              {step === 0 ? 'Basic Information' : 'Church Details'}
            </CardTitle>
            <p className="text-slate-600 mt-2">
              {step === 0
                ? 'Provide your personal details to get started'
                : 'Complete your church profile with detailed information'}
            </p>
          </CardHeader>

          <CardContent className="p-8">
            {step === 0 && (
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid gap-8">
                    <FormField
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="group">
                          <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your full name"
                              autoComplete="off"
                              readOnly
                              className="h-12 border-slate-200 rounded-xl bg-slate-100/50 text-slate-600 cursor-not-allowed"
                            />
                          </FormControl>
                          <FormDescription className="text-slate-500 text-xs">Your name as registered</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="group">
                          <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email"
                              autoComplete="off"
                              readOnly
                              className="h-12 border-slate-200 rounded-xl bg-slate-100/50 text-slate-600 cursor-not-allowed"
                            />
                          </FormControl>
                          <FormDescription className="text-slate-500 text-xs">Your registered email address</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Profile Picture (Optional)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={(e) => field.onChange(e.target.files)}
                                className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 file:transition-colors file:cursor-pointer border border-slate-200 rounded-xl bg-slate-50/50 p-3"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-slate-500 text-xs">PNG, JPG, or JPEG (Max 5MB)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Role</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="h-12 w-full border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white px-3"
                            >
                              <option value={Role.SUBACCOUNT_USER}>Subaccount User</option>
                              <option value={Role.ADMIN}>Admin</option>
                            </select>
                          </FormControl>
                          <FormDescription className="text-slate-500 text-xs">Select your role in the organization</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="missionStatement"
                      render={({ field }) => (
                        <FormItem className="group">
                          <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Mission Statement</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Describe your church's mission and values..."
                              className="min-h-[120px] resize-none border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                              rows={5}
                            />
                          </FormControl>
                          <FormDescription className="text-slate-500 text-xs">Summarize your church's mission</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handleBack}
                      disabled={step === 0}
                      className="px-6 py-3 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === 1 && (
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Church Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter church name"
                                autoComplete="off"
                                className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                              />
                            </FormControl>
                            <FormDescription className="text-slate-500 text-xs">Official name of your church</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="companyEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Church Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="church@example.com"
                                autoComplete="off"
                                className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                              />
                            </FormControl>
                            <FormDescription className="text-slate-500 text-xs">Primary contact email</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="companyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                autoComplete="off"
                                className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                              />
                            </FormControl>
                            <FormDescription className="text-slate-500 text-xs">Main contact number</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Street Address</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="123 Main Street"
                                autoComplete="off"
                                className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                              />
                            </FormControl>
                            <FormDescription className="text-slate-500 text-xs">Church physical address</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">City</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="City name"
                                  autoComplete="off"
                                  className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">ZIP Code</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="12345"
                                  autoComplete="off"
                                  className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <FormField
                        control={control}
                        name="churchLogo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Church Logo</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="image/png,image/jpeg,image/jpg"
                                  onChange={(e) => field.onChange(e.target.files)}
                                  className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 file:transition-colors file:cursor-pointer border border-slate-200 rounded-xl bg-slate-50/50 p-3"
                                />
                              </div>
                            </FormControl>
                            <FormDescription className="text-slate-500 text-xs">PNG, JPG, or JPEG (Max 5MB)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="whitelabel"
                        render={({ field }) => (
                          <FormItem>
                            <div className="rounded-xl border border-slate-200 p-6 bg-slate-50/30 hover:bg-slate-50/50 transition-colors">
                              <div className="flex items-center space-x-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="w-5 h-5 border-slate-300 text-slate-700 focus:ring-slate-400/20 rounded-md"
                                  />
                                </FormControl>
                                <div className="space-y-1 flex-1">
                                  <FormLabel className="text-slate-700 font-semibold cursor-pointer">Whitelabel Branding</FormLabel>
                                  <FormDescription className="text-slate-500 text-xs">Enable custom branding for your church</FormDescription>
                                </div>
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">State</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="State"
                                  autoComplete="off"
                                  className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Country</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Country"
                                  autoComplete="off"
                                  className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold text-sm uppercase tracking-wide">Membership Goal</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="100"
                                autoComplete="off"
                                className="h-12 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 transition-all duration-300 bg-slate-50/50 focus:bg-white"
                                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                              />
                            </FormControl>
                            <FormDescription className="text-slate-500 text-xs">Target membership count</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={handleBack}
                      disabled={step === 0}
                      className="px-6 py-3 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="px-8 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Complete Setup
                      <Check className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}