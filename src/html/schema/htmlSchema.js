import { z } from 'zod';

const WidgetSchema = z.object({
  content: z.string(),
});

const ConfigSchema = z.object({
  widget: WidgetSchema,
});

export const HtmlConfigSchema = z.object({
  config: ConfigSchema,
});

export const defaultValues = {
  widget: {
    content: undefined,
  },
};
