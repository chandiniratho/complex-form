import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  age: z.number().min(18, "You must be at least 18"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Define TypeScript type for form fields
type FormData = z.infer<typeof formSchema>;

const ComplexForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "auto" }}>
      <div>
        <label>Name:</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Age:</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label>Confirm Password:</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplexForm;
