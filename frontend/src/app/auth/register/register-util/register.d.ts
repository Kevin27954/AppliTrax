export interface RegisterFormData {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  checked: FormControl<boolean | null>;
}

export type fieldClassType = 'ng-invalid ng-dirty' | '';

export type passwordHelpText = 'Weak Password' | 'Not Equal Password' | '';
