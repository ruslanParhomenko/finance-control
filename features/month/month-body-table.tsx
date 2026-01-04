// import { TableBody, TableCell, TableRow } from "@/components/ui/table";
// import { expenseCategories } from "@/constants/expense";
// import { getMonthDays } from "@/utils/get-month-days";
// import { UseFormReturn } from "react-hook-form";

// export default function MonthBodyTable({
//   form,
//   monthDays,
// }: {
//   form: UseFormReturn<any>;
//   monthDays: ReturnType<typeof getMonthDays> | [];
// }) {
//   const { register, watch } = form;
//   const value = watch();
//   const isClosed = value?.isClosed;
//   const isDisabled = isClosed;
//   return (
//     <TableBody>
//       <TableRow>
//         <TableCell
//           colSpan={monthDays.length + 2}
//           className="h-10 border-0 text-bl"
//         >
//           CASH
//         </TableCell>
//       </TableRow>
//       {expenseCategories.map((row, index) => {
//         const total = (
//           value[row.key as keyof CashFormType["rowCashData"]] as string[]
//         )
//           ?.reduce((acc: number, val: string) => acc + Number(val || 0), 0)
//           .toFixed(2);
//         return (
//           <React.Fragment key={row.key}>
//             <TableRow>
//               <TableCell
//                 colSpan={2}
//                 className={cn(
//                   "font-medium sticky left-0 p-0 text-start truncate",
//                   row.colorText
//                 )}
//               >
//                 {row.label}
//               </TableCell>

//               {monthDays.map((_, dayIndex) => {
//                 if (
//                   isClosed &&
//                   (row.key === "tipsByDay" || row.key === "nbmPayByDay")
//                 )
//                   return null;
//                 return (
//                   <TableCell
//                     key={dayIndex}
//                     className="p-0 text-center border-x"
//                   >
//                     <input
//                       type="text"
//                       disabled={isDisabled}
//                       data-row={index}
//                       data-col={dayIndex}
//                       {...register(
//                         `rowCashData.${row.key}.${dayIndex}` as FieldPath<CashFormType>
//                       )}
//                       className={cn(
//                         "border-0  p-0 h-7 text-center  shadow-none text-xs w-12",
//                         row.colorText
//                       )}
//                       onKeyDown={(e) =>
//                         handleTableNavigation(e, +index, dayIndex)
//                       }
//                     />
//                   </TableCell>
//                 );
//               })}
//               <TableCell className="text-rd font-bold">
//                 {!isClosed && total}
//               </TableCell>
//             </TableRow>
//             {(row.key === "visaCasinoByDay" ||
//               row.key === "visaCasinoBarByDay") && (
//               <TableRow>
//                 <TableCell
//                   colSpan={monthDays.length + 2}
//                   className="h-10 border-0 text-bl"
//                 >
//                   BAR
//                 </TableCell>
//               </TableRow>
//             )}
//           </React.Fragment>
//         );
//       })}
//       <TableRow>
//         <TableCell className="h-10 border-0 text-bl">remaining cash</TableCell>
//         <TableCell className="h-10 border-0 text-bl" colSpan={2}>
//           {(totalCashBar - totalVisa - totalBank - totalNbmCollection).toFixed(
//             2
//           )}
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell className="h-10 border-0 text-bl">
//           visa difference:
//         </TableCell>
//         <TableCell className="h-10 border-0 text-bl" colSpan={2}>
//           {(totalVisaBar - totalVisa).toFixed(2)}
//         </TableCell>
//       </TableRow>
//     </TableBody>
//   );
// }
