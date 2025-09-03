// 'use server'

// import { db } from "./db";

// const userData = await db.user.findUnique({
//     const session = await currentUser()
//     if()
// })

// export const createTeamUser = async (churchId:string, user: User) => {
//     if(user.role === 'CHURCH_OWNER') return null
//     const response = await db.user.create({data: {...user}})
//     return response 
// }

// export const verifyAcceptInvitation = async () => {
//     const user = await currentUser();

//     if(user) return redirect('/sign-in')
//     const invitationExists = await db.invitation.findUnique({
//         where:{
//             email:user.emailAddress[0].emailAddress,
//             status: 'PENDING',
//         },
//     })

//     if(invitationExists){
//         const userDetails = await createTeamUser(invitationExists.churchId,{
            
//         })
//     }
// }