"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MyBtn from "@/components/ui/MyBtn";
import {
  ContactFormSchema,
  ContactFormType,
} from "@/lib/validation/contactFormSchema";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { SendMail } from "@/lib/api/contact";

const ContactForm = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
    mode: "onChange",
    defaultValues: {
      phone: "+20",
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const lang = useLocale();
  const t = useTranslations("contact");
  const tCommon = useTranslations();

  const onSubmit = (data: ContactFormType) => {
    // Create the form data object
    const formData: {
      name: string;
      phone: string;
      email: string;
      subject: string;
      message: string;
    } = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };

   
    SendMail(formData).then((res) => {
      console.log(res.status);
      if (res.status === "success") {
        toast.custom((toastObj) => (
          <div
            className={`${
              toastObj.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex w-full max-w-md rounded-xl bg-background shadow-2xl border border-primary/20 overflow-hidden`}
            dir={lang === "ar" ? "rtl" : "ltr"}
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
                <p className="text-sm font-semibold text-primary mb-1">
                  {t("successMessage.title")}
                </p>
                <p className="text-sm text-foreground/70">
                  {t("successMessage.description")}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => toast.dismiss(toastObj.id)}
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
      }
    });
  };

  return (
    <div
      className={`${className} rounded-lg space-y-3 group`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <h1 className="text-primary text-2xl md:text-4xl font-bold capitalize relative animated-underline w-fit">
        {t("title")}
      </h1>

      <p className="text-foreground/80">{t("description")}</p>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>{t("nameInput.label")}</FieldLabel>
              <Input
                {...register("name")}
                placeholder={t("nameInput.placeholder")}
                className="bg-background"
              />
              {errors.name && (
                <span className="text-primary">
                  {tCommon(errors.name.message as string)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>{t("emailInput.label")}</FieldLabel>
              <Input
                {...register("email")}
                placeholder={t("emailInput.placeholder")}
                type="email"
                className="bg-background"
              />
              {errors.email && (
                <span className="text-primary">
                  {tCommon(errors.email.message as string)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>{t("phoneInput.label")}</FieldLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="+20 123 456 7890"
                    error={!!errors.phone}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  />
                )}
              />
              {errors.phone && (
                <span className="text-primary">
                  {tCommon(errors.phone.message as string)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>{t("subjectInput.label")}</FieldLabel>
              <Input
                {...register("subject")}
                placeholder={t("subjectInput.placeholder")}
                className="bg-background"
              />
              {errors.subject && (
                <span className="text-primary">
                  {tCommon(errors.subject.message as string)}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel>{t("messageInput.label")}</FieldLabel>
              <Textarea
                {...register("message")}
                placeholder={t("messageInput.placeholder")}
                className="bg-background resize-none h-[150px]"
              />
              {errors.message && (
                <span className="text-primary">
                  {tCommon(errors.message.message as string)}
                </span>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>

        <MyBtn
          text={t("btnText")}
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
