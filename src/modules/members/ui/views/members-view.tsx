"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client"

import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns, Item } from "../components/columns";
import { useRouter } from "next/navigation";

export const MembersView = () => {
    const trpc = useTRPC();
    const router = useRouter();
   const {data } = useSuspenseQuery(trpc.members.getAll.queryOptions());

    // Sample data
    // const data: Member[] = [
    //   {
    //     id: 1,
    //     email: "john.doe@example.com",
    //     state: "CA",
    //     member_tags: ["premium", "active"],
    //     additional_info: { plan: "gold" },
    //     mobile_number: "123-456-7890",
    //     member_id: "M001",
    //     first_name: "John",
    //     middle_name: null,
    //     last_name: "Doe",
    //     gender: "Male",
    //     birthday: new Date("1990-05-15"),
    //     address: "123 Main St",
    //     address_line_1: "123 Main St",
    //     address_line_2: null,
    //     city: "Los Angeles",
    //     zip_code: "90001",
    //     membership_status: "Active",
    //     profile_photo: "https://example.com/john.jpg",
    //     qr_code: "https://example.com/qr1.png",
    //     created_at: new Date("2023-01-10"),
    //     updated_at: new Date("2023-06-15"),
    //   },
    //   {
    //     id: 2,
    //     email: "jane.smith@gmail.com",
    //     state: "NY",
    //     member_tags: ["standard"],
    //     additional_info: null,
    //     mobile_number: "987-654-3210",
    //     member_id: "M002",
    //     first_name: "Jane",
    //     middle_name: "A",
    //     last_name: "Smith",
    //     gender: "Female",
    //     birthday: new Date("1985-08-22"),
    //     address: "456 Elm St",
    //     address_line_1: "456 Elm St",
    //     address_line_2: "Apt 4B",
    //     city: "New York",
    //     zip_code: "10001",
    //     membership_status: "Inactive",
    //     profile_photo: null,
    //     qr_code: "https://example.com/qr2.png",
    //     created_at: new Date("2022-11-05"),
    //     updated_at: new Date("2023-03-20"),
    //   },
    //   {
    //     id: 3,
    //     email: "bob.jones@yahoo.com",
    //     state: "TX",
    //     member_tags: ["trial"],
    //     additional_info: { plan: "silver" },
    //     mobile_number: null,
    //     member_id: "M003",
    //     first_name: "Bob",
    //     middle_name: null,
    //     last_name: "Jones",
    //     gender: null,
    //     birthday: null,
    //     address: "789 Oak St",
    //     address_line_1: "789 Oak St",
    //     address_line_2: null,
    //     city: "Houston",
    //     zip_code: "77001",
    //     membership_status: "Suspended",
    //     profile_photo: "https://example.com/bob.jpg",
    //     qr_code: null,
    //     created_at: new Date("2023-04-01"),
    //     updated_at: new Date("2023-07-10"),
    //   },
    //   {
    //     id: 4,
    //     email: null,
    //     state: "FL",
    //     member_tags: ["premium"],
    //     additional_info: null,
    //     mobile_number: "555-123-4567",
    //     member_id: "M004",
    //     first_name: "Alice",
    //     middle_name: null,
    //     last_name: "Brown",
    //     gender: "Female",
    //     birthday: new Date("1992-03-12"),
    //     address: null,
    //     address_line_1: "101 Pine St",
    //     address_line_2: null,
    //     city: "Miami",
    //     zip_code: "33101",
    //     membership_status: "Active",
    //     profile_photo: null,
    //     qr_code: "https://example.com/qr4.png",
    //     created_at: new Date("2023-02-15"),
    //     updated_at: new Date("2023-08-01"),
    //   },
    //   {
    //     id: 5,
    //     email: "carol.white@hotmail.com",
    //     state: null,
    //     member_tags: ["standard", "new"],
    //     additional_info: { plan: "bronze" },
    //     mobile_number: "444-987-6543",
    //     member_id: "M005",
    //     first_name: "Carol",
    //     middle_name: "B",
    //     last_name: "White",
    //     gender: "Female",
    //     birthday: new Date("1988-11-30"),
    //     address: "202 Cedar St",
    //     address_line_1: "202 Cedar St",
    //     address_line_2: null,
    //     city: "Seattle",
    //     zip_code: "98101",
    //     membership_status: "Active",
    //     profile_photo: "https://example.com/carol.jpg",
    //     qr_code: "https://example.com/qr5.png",
    //     created_at: new Date("2023-03-22"),
    //     updated_at: new Date("2023-09-01"),
    //   },
    // ]

    return (
        <div>
            {/* <ResponsiveDialog
                title="ResponsiveDialog text"
                description="ResponsiveDialog Description"
                open
                onOpenChange={() => {}}
            >
                <Button>
                    Actions
                </Button>
            </ResponsiveDialog> */}
            <DataTable
              data={data} 
              columns={columns}
              onRowClick={(row) => router.push(`members/${row.id}`)} 
            />
            {/* {JSON.stringify(data, null, 2)} */}
        </div>
    )
} 

export const MembersviewLoading = () => {
    return(
        <LoadingState
            title="Loading Members"
            description="This may take a few seconds..."
        />
    );
}

export const MembersviewError = () => {
    return(
        <ErrorState
                title="Failed to Load members"
                description="Please try again later"
        />
    );
}