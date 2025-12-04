"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MyBtn from "@/components/ui/MyBtn";
import {
  ContactFormSchema,
  ContactFormType,
} from "@/lib/validation/contactFormSchema";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const ContactForm = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ContactFormType) => {
    toast("Message sent successfully!", {
      icon: <IoCheckmarkDoneCircleSharp />,
      style: {
        background: "var(--foreground)",
        color: "var(--background)",
        fontSize: "1.1rem",
      },
    });
    reset();
  };

  return (
    <div className={`${className ?? ""} rounded-lg space-y-3 group`}>
      <h1 className="text-primary text-2xl md:text-4xl font-bold capitalize relative animated-underline w-fit">
        get in touch
      </h1>

      <p className="text-foreground/80">
        lets get in touch and work together to create something amazing and
        unforgettable
      </p>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                {...register("name")}
                placeholder="Your name"
                className="bg-background"
              />
              {errors.name && (
                <span className="text-primary">{errors.name.message}</span>
              )}
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...register("email")}
                placeholder="you@example.com"
                type="email"
                className="bg-background"
              />
              {errors.email && (
                <span className="text-primary">{errors.email.message}</span>
              )}
            </Field>

            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <Input
                {...register("phone")}
                placeholder="01234567890"
                type="tel"
                className="bg-background"
              />
              {errors.phone && (
                <span className="text-primary">{errors.phone.message}</span>
              )}
            </Field>

            <Field>
              <FieldLabel>Subject</FieldLabel>
              <Input
                {...register("subject")}
                placeholder="Subject"
                className="bg-background"
              />
              {errors.subject && (
                <span className="text-primary">{errors.subject.message}</span>
              )}
            </Field>

            <Field>
              <FieldLabel>Message</FieldLabel>
              <Textarea
                {...register("message")}
                placeholder="Your message..."
                className="bg-background resize-none h-[150px]"
              />
              {errors.message && (
                <span className="text-primary">{errors.message.message}</span>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        <MyBtn
          text="Send Message"
          variant="primary"
          width="full"
          type="submit"
          className="mt-5"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};

export default ContactForm;
