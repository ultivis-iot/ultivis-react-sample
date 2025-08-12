import { useFormContext } from "react-hook-form";
import { FormTextareaField } from "@ultivis-iot/react";

const HtmlConfig = () => {
  const { control } = useFormContext();

  return (
    <>
      <FormTextareaField
        label="HTML"
        type="textarea"
        control={control}
        name="config.widget.content"
      />
    </>
  );
};

export default HtmlConfig;
