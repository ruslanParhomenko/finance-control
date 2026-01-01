import TextInput from "@/components/input/text-input";

export default function AuthForm() {
  return (
    <>
      <TextInput
        fieldName="email"
        fieldLabel="email"
        placeholder="Enter your email"
        type="email"
      />
      <TextInput
        fieldName="password"
        fieldLabel="password"
        placeholder="Enter your password"
        type="password"
      />
    </>
  );
}
