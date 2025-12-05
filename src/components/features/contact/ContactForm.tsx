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
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import toast from "react-hot-toast";

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
   toast.custom((t) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } pointer-events-auto flex w-full max-w-md rounded-xl bg-background shadow-2xl border border-primary/20 overflow-hidden`}
  >
    {/* Colored side accent */}
    <div className="w-1.5 bg-primary"></div>
    
    <div className="flex flex-1 items-start gap-3 p-4">
      {/* Success Icon */}
      <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5">
        <p className="text-sm font-semibold text-primary mb-1">Success!</p>
        <p className="text-sm text-foreground/70">
          Your message has been sent successfully
        </p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="shrink-0 w-8 h-8 rounded-lg hover:bg-secondary/50 transition-colors duration-200 flex items-center justify-center group"
        aria-label="Close notification"
      >
        <svg
          className="w-4 h-4 text-foreground/50 group-hover:text-foreground transition-colors"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
));
    reset();
  };

  return (
    <div className={`${className} rounded-lg space-y-3 group`}>
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
