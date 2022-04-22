export const validateForm = (fields: any) => {
  let errors: any = [];
  fields.forEach((field: any) => {
    if (field.required) {
      const fieldValue = field.input.state.value;
      if (fieldValue === "") {
        const error = {
          id: field.id,
          message: `Please check your ${field.id}`,
        };
        errors.push(error);
      }
    }
  });
  return errors;
};
