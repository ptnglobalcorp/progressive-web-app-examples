import { useStateInput } from "@common/hooks/useStateInput";

export const useSignUpFields = () => {
  return [
    {
      id: "name",
      label: "Name",
      required: true,
      input: {
        props: {
          type: "text",
          placeholder: "name",
        },
        state: useStateInput(""),
      },
    },
    {
      id: "password",
      label: "Password",
      required: true,
      input: {
        props: {
          type: "password",
          placeholder: "*********",
        },
        state: useStateInput(""),
      },
    },
  ];
};
