import Joi from "joi";

const categoryFields = {
  name: Joi.string()
    .min(5)
    .messages({
      "string.min": "Tên thể loại phải có ít nhất 5 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Tên thể loại là bắt buộc.",
    }),
  description: Joi.string().required().messages({
    "any.required": "Mô tả thể loại là bắt buộc.",
  }),
};

const getValidationSchema = (type) => {
  if (type === "category") {
    return Joi.object(categoryFields);
  }
};

export const validateCategory = (type) => {
  return (req, res, next) => {
    const schema = getValidationSchema(type);

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => ({
        message: err.message,
        Trường: err.context.key, // Thêm trường bị lỗi
      }));
      return res.status(400).json({ success: false, errors });
    }

    next();
  };
};
