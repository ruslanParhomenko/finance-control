import NumericInput from "@/components/input/numeric-input";
import { bankCategories } from "./constants";
import { Label } from "@/components/ui/label";

export default function BankForm() {
  return (
    <div className="flex h-[70vh] w-screen flex-col justify-between px-2 pt-4">
      {bankCategories.map((bank, index) => (
        <div key={bank.name + index} className="flex flex-row justify-between">
          <Label className="w-20">{bank.label}</Label>
          <NumericInput fieldName={bank.name} className="w-30" />
          <Label className="w-10 text-center">{bank.currency}</Label>
        </div>
      ))}
    </div>
  );
}
