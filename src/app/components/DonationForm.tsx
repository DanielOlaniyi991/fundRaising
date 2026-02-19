"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Colors,
  Typography,
  TextField,
} from "@Coronation-ArchTouch/cor-ui";
import { Icon } from "@Coronation-ArchTouch/cor-ui-icons";

interface FormData {
  fullName: string;
  email: string;
  amount: string;
  customAmount: string;
}

interface Errors {
  fullName?: string;
  email?: string;
  amount?: string;
  customAmount?: string;
}

interface Touched {
  fullName?: boolean;
  email?: boolean;
  amount?: boolean;
  customAmount?: boolean;
}

const DonationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    amount: "",
    customAmount: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});

  const predefinedAmounts = [5000, 10000, 15000, 20000, 50000];

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "fullName":
        return value.trim().length < 2
          ? "Name must be at least 2 characters"
          : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email address"
          : "";
      case "amount":
        if (value === "custom") {
          const customVal = parseFloat(formData.customAmount);
          return !customVal || customVal < 5000
            ? "Amount must be at least #5000"
            : "";
        }
        return !value ? "Please select an amount" : "";
      default:
        return "";
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (
      touched[field] ||
      (field === "customAmount" && formData.amount === "custom")
    ) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const handleAmountSelect = (amount: number) => {
    setFormData((prev) => ({
      ...prev,
      amount: amount.toString(),
      customAmount: "",
    }));
    setErrors((prev) => ({ ...prev, amount: "" }));
    setTouched((prev) => ({ ...prev, amount: true }));
  };

  const handleCustomAmountClick = () => {
    setFormData((prev) => ({ ...prev, amount: "custom" }));
    setTouched((prev) => ({ ...prev, amount: true }));
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Errors = {};

    (["fullName", "email", "amount"] as const).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (formData.amount === "custom") {
      const error = validateField("customAmount", formData.customAmount);
      if (error) newErrors.customAmount = error;
    }

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      amount: true,
      customAmount: true,
    });

    if (Object.keys(newErrors).length === 0) {
      const donationAmount =
        formData.amount === "custom"
          ? parseFloat(formData.customAmount)
          : parseFloat(formData.amount);

      sessionStorage.setItem(
        "donationData",
        JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          amount: donationAmount,
        }),
      );

      router.push("/payment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <TextField
          label="Full Name"
          required
          theme="corporate"
          onChange={(e) => handleChange("fullName", e.target.value)}
          value={formData.fullName}
          error={!!(touched.fullName && errors.fullName)}
          placeholder="John Doe"
        />
        {touched.fullName && errors.fullName && (
          <Typography as="p" className="mt-1 text-sm text-red-600">
            {errors.fullName}
          </Typography>
        )}
      </div>

      {/* Email */}
      <div>
        <TextField
          label="Email Address"
          required
          theme="corporate"
          onChange={(e) => handleChange("email", e.target.value)}
          value={formData.email}
          error={!!(touched.email && errors.email)}
          placeholder="john@example.com"
        />
        {touched.email && errors.email && (
          <Typography as="p" className="mt-1 text-sm text-red-600">
            {errors.email}
          </Typography>
        )}
      </div>

      {/* Donation Amount */}
      <div>
        <Typography
          variant="label-1-regular"
          className="block text-sm font-medium mb-3"
          style={{ color: Colors.primary.base.black }}
        >
          Donation Amount <span className="text-red-500">*</span>
        </Typography>

        {/* Predefined Amounts */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
          {predefinedAmounts.map((amount) => (
            <Button
              key={amount}
              color="brand"
              theme="corporate"
              variant={
                formData.amount === amount.toString() ? "bold" : "stroke"
              }
              size="medium"
              onClick={() => handleAmountSelect(amount)}
              className="min-w-[80px] sm:min-w-[96px] text-center font-medium"
            >
              #{amount.toLocaleString()}
            </Button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="flex gap-3 items-start">
          <Button
            color="brand"
            theme="corporate"
            variant={formData.amount === "custom" ? "bold" : "stroke"}
            size="medium"
            onClick={handleCustomAmountClick}
            className=""
          >
            Custom
          </Button>
          {formData.amount === "custom" && (
            <div className="flex-1">
              <TextField
                type="number"
                placeholder="Enter amount"
                theme="corporate"
                onChange={(e) => handleChange("customAmount", e.target.value)}
                error={!!(touched.customAmount && errors.customAmount)}
                value={formData.customAmount}
                prefixIcon={
                  <Icon
                    icon="currency-ngn"
                    variant="outline"
                    color={Colors.primary.gray[1100]}
                  />
                }
              />
              {touched.customAmount && errors.customAmount && (
                <Typography as="p" className="mt-1 text-sm text-red-600">
                  {errors.customAmount}
                </Typography>
              )}
            </div>
          )}
        </div>

        {errors.amount && touched.amount && (
          <Typography as="p" className="mt-2 text-sm text-red-600">
            {errors.amount}
          </Typography>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        color="brand"
        theme="corporate"
        size="large"
        label="Continue to Payment"
      />

      <Typography
        as="p"
        className="text-sm text-center"
        style={{ color: Colors.primary.gray[600] }}
      >
        Your information is secure and will only be used to process your
        donation.
      </Typography>
    </form>
  );
};

export default DonationForm;

// // "use client";

// // import { useState, FormEvent } from "react";
// // import { useRouter } from "next/navigation";
// // import {
// //   Button,
// //   Colors,
// //   Typography,
// //   // TextField,    ← commented out / removed
// // } from "@Coronation-ArchTouch/cor-ui";

// // interface FormData {
// //   fullName: string;
// //   email: string;
// //   amount: string;
// //   customAmount: string;
// // }

// // interface Errors {
// //   fullName?: string;
// //   email?: string;
// //   amount?: string;
// //   customAmount?: string;
// // }

// // interface Touched {
// //   fullName?: boolean;
// //   email?: boolean;
// //   amount?: boolean;
// //   customAmount?: boolean;
// // }

// // const DonationForm = () => {
// //   const router = useRouter();
// //   const [formData, setFormData] = useState<FormData>({
// //     fullName: "",
// //     email: "",
// //     amount: "",
// //     customAmount: "",
// //   });

// //   const [errors, setErrors] = useState<Errors>({});
// //   const [touched, setTouched] = useState<Touched>({});

// //   const predefinedAmounts = [25, 50, 100, 250, 500];

// //   const validateField = (name: keyof FormData, value: string): string => {
// //     switch (name) {
// //       case "fullName":
// //         return value.trim().length < 2
// //           ? "Name must be at least 2 characters"
// //           : "";
// //       case "email":
// //         return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
// //           ? "Invalid email address"
// //           : "";
// //       case "amount":
// //         if (value === "custom") {
// //           const customVal = parseFloat(formData.customAmount);
// //           return !customVal || customVal < 1
// //             ? "Amount must be at least $1"
// //             : "";
// //         }
// //         return !value ? "Please select an amount" : "";
// //       default:
// //         return "";
// //     }
// //   };

// //   const handleChange = (field: keyof FormData, value: string) => {
// //     setFormData((prev) => ({ ...prev, [field]: value }));

// //     if (
// //       touched[field] ||
// //       (field === "customAmount" && formData.amount === "custom")
// //     ) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         [field]: validateField(field, value),
// //       }));
// //     }
// //   };

// //   const handleAmountSelect = (amount: number) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       amount: amount.toString(),
// //       customAmount: "",
// //     }));
// //     setErrors((prev) => ({ ...prev, amount: "" }));
// //     setTouched((prev) => ({ ...prev, amount: true }));
// //   };

// //   const handleCustomAmountClick = () => {
// //     setFormData((prev) => ({ ...prev, amount: "custom" }));
// //     setTouched((prev) => ({ ...prev, amount: true }));
// //   };

// //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     const newErrors: Errors = {};

// //     (["fullName", "email", "amount"] as const).forEach((key) => {
// //       const error = validateField(key, formData[key]);
// //       if (error) newErrors[key] = error;
// //     });

// //     if (formData.amount === "custom") {
// //       const error = validateField("customAmount", formData.customAmount);
// //       if (error) newErrors.customAmount = error;
// //     }

// //     setErrors(newErrors);
// //     setTouched({
// //       fullName: true,
// //       email: true,
// //       amount: true,
// //       customAmount: true,
// //     });

// //     if (Object.keys(newErrors).length === 0) {
// //       const donationAmount =
// //         formData.amount === "custom"
// //           ? parseFloat(formData.customAmount)
// //           : parseFloat(formData.amount);

// //       sessionStorage.setItem(
// //         "donationData",
// //         JSON.stringify({
// //           fullName: formData.fullName,
// //           email: formData.email,
// //           amount: donationAmount,
// //         }),
// //       );

// //       router.push("/payment");
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6">
// //       {/* Full Name */}
// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Full Name <span className="text-red-500">*</span>
// //         </label>
// //         <input
// //           type="text"
// //           required
// //           placeholder="John Doe"
// //           value={formData.fullName}
// //           onChange={(e) => handleChange("fullName", e.target.value)}
// //           className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
// //             touched.fullName && errors.fullName ? "border-red-500" : ""
// //           }`}
// //         />
// //         {touched.fullName && errors.fullName && (
// //           <Typography as="p" className="mt-1 text-sm text-red-600">
// //             {errors.fullName}
// //           </Typography>
// //         )}
// //       </div>

// //       {/* Email */}
// //       <div>
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           Email Address <span className="text-red-500">*</span>
// //         </label>
// //         <input
// //           type="email"
// //           required
// //           placeholder="john@example.com"
// //           value={formData.email}
// //           onChange={(e) => handleChange("email", e.target.value)}
// //           className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
// //             touched.email && errors.email ? "border-red-500" : ""
// //           }`}
// //         />
// //         {touched.email && errors.email && (
// //           <Typography as="p" className="mt-1 text-sm text-red-600">
// //             {errors.email}
// //           </Typography>
// //         )}
// //       </div>

// //       {/* Donation Amount */}
// //       <div>
// //         <Typography
// //           variant="label-1-regular"
// //           className="block text-sm font-medium mb-3"
// //           style={{ color: Colors.primary.base.black }}
// //         >
// //           Donation Amount <span className="text-red-500">*</span>
// //         </Typography>

// //         {/* Predefined Amounts */}
// //         <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
// //           {predefinedAmounts.map((amount) => (
// //             <Button
// //               key={amount}
// //               color="brand"
// //               theme="corporate"
// //               variant={
// //                 formData.amount === amount.toString() ? "bold" : "stroke"
// //               }
// //               size="medium"
// //               onClick={() => handleAmountSelect(amount)}
// //               className="min-w-[80px] sm:min-w-[96px] text-center font-medium"
// //             >
// //               ${amount}
// //             </Button>
// //           ))}
// //         </div>

// //         {/* Custom Amount */}
// //         <div className="flex gap-3 items-start">
// //           <Button
// //             color="brand"
// //             theme="corporate"
// //             variant={formData.amount === "custom" ? "bold" : "stroke"}
// //             size="medium"
// //             onClick={handleCustomAmountClick}
// //           >
// //             Custom
// //           </Button>

// //           {formData.amount === "custom" && (
// //             <div className="flex-1">
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Amount
// //               </label>
// //               <div className="relative">
// //                 <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
// //                   $
// //                 </span>
// //                 <input
// //                   type="number"
// //                   placeholder="Enter amount"
// //                   min="1"
// //                   step="0.01"
// //                   value={formData.customAmount}
// //                   onChange={(e) => handleChange("customAmount", e.target.value)}
// //                   className={`w-full pl-8 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
// //                     touched.customAmount && errors.customAmount
// //                       ? "border-red-500"
// //                       : ""
// //                   }`}
// //                 />
// //               </div>
// //               {touched.customAmount && errors.customAmount && (
// //                 <Typography as="p" className="mt-1 text-sm text-red-600">
// //                   {errors.customAmount}
// //                 </Typography>
// //               )}
// //             </div>
// //           )}
// //         </div>

// //         {errors.amount && touched.amount && (
// //           <Typography as="p" className="mt-2 text-sm text-red-600">
// //             {errors.amount}
// //           </Typography>
// //         )}
// //       </div>

// //       {/* Submit Button */}
// //       <Button
// //         type="submit"
// //         color="brand"
// //         theme="corporate"
// //         size="large"
// //         label="Continue to Payment"
// //         className="w-full"
// //       />

// //       <Typography
// //         as="p"
// //         className="text-sm text-center"
// //         style={{ color: Colors.primary.gray[600] }}
// //       >
// //         Your information is secure and will only be used to process your
// //         donation.
// //       </Typography>
// //     </form>
// //   );
// // };

// // export default DonationForm;

// // "use client";

// // import { useState } from "react";
// // import { Typography, Colors, TextField } from "@Coronation-ArchTouch/cor-ui";

// // const TestForm = () => {
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");

// //   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setName(e.target.value);
// //   };

// //   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setEmail(e.target.value);
// //   };

// //   return (
// //     <div className="max-w-md mx-auto p-8">
// //       <Typography
// //         as="h2"
// //         fontSize={24}
// //         fontWeight={600}
// //         className="mb-6"
// //         style={{ color: Colors.primary.base.black }}
// //       >
// //         Test Form
// //       </Typography>

// //       <div className="space-y-4">
// //         {/* Test TextField */}
// //         <div>
// //           <TextField
// //             label="Name"
// //             type="text"
// //             placeholder="Enter your name"
// //             onChange={handleNameChange}
// //             value={name}
// //           />
// //         </div>

// //         <div>
// //           <TextField
// //             label="Email"
// //             type="email"
// //             placeholder="Enter your email"
// //             onChange={handleEmailChange}
// //             value={email}
// //           />
// //         </div>

// //         <Typography
// //           as="p"
// //           fontSize={14}
// //           style={{ color: Colors.primary.gray?.[600] }}
// //         >
// //           Name: {name || "(empty)"}
// //         </Typography>

// //         <Typography
// //           as="p"
// //           fontSize={14}
// //           style={{ color: Colors.primary.gray?.[600] }}
// //         >
// //           Email: {email || "(empty)"}
// //         </Typography>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TestForm;
