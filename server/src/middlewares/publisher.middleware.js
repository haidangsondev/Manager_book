import Joi from "joi";

const publisherFields = {
  name: Joi.string()
    .min(5)
    .messages({
      "string.min": "Tên nhà xuất bản phải có ít nhất 5 ký tự.",
    })
    .max(100)
    .messages({
      "string.max": "Tên nhà xuất bản không vượt quá 100 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Tên nhà xuất bản là bắt buộc.",
    }),
  address: Joi.string()
    .max(100)
    .messages({
      "string.max": "Địa chỉ không vượt quá 100 ký tự.",
    })
    .required()
    .messages({
      "any.required": "Địa chỉ là bắt buộc.",
    }),
};

const getValidationSchema = (type) => {
  if (type === "publisher") {
    return Joi.object(publisherFields);
  }
};

export const validatePublisher = (type) => {
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
