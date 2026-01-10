// "use client";
// import TextInput from "@/components/input/text-input";
// import { Button } from "@/components/ui/button";
// import { FormWrapper } from "@/components/wrapper/form-wrapper";
// import { authClient } from "@/lib/firebase-client";
// import { sendPasswordResetEmail } from "firebase/auth";
// import Link from "next/link";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";

// export default function ResetPage() {
//   const form = useForm({
//     defaultValues: { email: "" },
//   });
//   const onSubmit: SubmitHandler<any> = async (data) => {
//     await sendPasswordResetEmail(authClient, data.email);
//     toast.success("Письмо для сброса пароля отправлено на ваш email");
//   };
//   return (
//     <FormWrapper
//       form={form}
//       onSubmit={onSubmit}
//       className="flex flex-col items-center justify-center min-h-screen"
//     >
//       <div className="w-full md:w-1/4 p-4">
//         <TextInput
//           fieldName="email"
//           fieldLabel="email"
//           placeholder="Enter your email"
//           type="email"
//         />
//         <Button
//           type="submit"
//           className="w-full"
//           disabled={form.formState.isSubmitting}
//         >
//           {form.formState.isSubmitting ? "Отправка..." : "Отправить письмо"}
//         </Button>
//         <div className="flex justify-between py-4">
//           <Link
//             href="/signup"
//             className="text-sm text-blue-500 hover:underline"
//           >
//             signup
//           </Link>
//           <Link
//             href="/signin"
//             className="ml-4 text-sm text-blue-500 hover:underline"
//           >
//             signin
//           </Link>
//         </div>
//       </div>
//     </FormWrapper>
//   );
// }
