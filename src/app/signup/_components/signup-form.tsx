import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
          <RadioGroup defaultValue="trimestral" className="flex align-center">
          <FieldLabel htmlFor="kubernetes-r2h">
            <Field orientation="vertical" className="flex items-center justify-center gap-4">
              <FieldContent>
                <FieldTitle>Trimestral</FieldTitle>
                <FieldDescription>
                  Acesso por 3 meses.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="trimestral" id="kubernetes-r2h" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="semestral">
            <Field orientation="vertical" className="flex items-center justify-center gap-4">
              <FieldContent>
                <FieldTitle>Semestral</FieldTitle>
                <FieldDescription>
                  Acesso por 6 meses.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="semestral" id="semestral" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="anual">
            <Field orientation="vertical" className="flex items-center justify-center gap-4">
              <FieldContent>
                <FieldTitle>Anual</FieldTitle>
                <FieldDescription>
                  Acesso por 12 meses.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="anual" id="anual" />
            </Field>
          </FieldLabel>
        </RadioGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">CPF</FieldLabel>
          <Input
            id="confirm-password"
            type="text"
            required
            className="bg-background"
          />
          <FieldDescription>Please confirm your CPF.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Nome do Estabelecimento</FieldLabel>
          <Input
            id="confirm-password"
            type="text"
            required
            className="bg-background"
          />
          <FieldDescription>Please confirm your Nome do Estabelecimento.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            className="bg-background"
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
      </FieldGroup>
    </form>
  )
}
