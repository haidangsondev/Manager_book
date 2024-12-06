import Joi from "joi";

const authorFields = {
  name: Joi.string()
    .min(5)
    .messages({
      "string.min": "Tên tác giả phải có ít nhất 5 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Tên tác giả là bắt buộc.",
    }),
  bio: Joi.string().required().messages({
    "any.required": "Mô tả tác giả là bắt buộc.",
  }),
  nationality: Joi.string().required().messages({
    "any.required": "Quốc tịch tác giả là bắt buộc.",
  }),
};

const getValidationSchema = (type) => {
  if (type === "author") {
    return Joi.object(authorFields);
  }
};

export const validateAuthor = (type) => {
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
