const createError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

/**
 * Validate dataset creation payload.
 * Requirements:
 *   - id (required)
 *   - instruction (required)
 *   - metadata (optional, must be an object with allowed string fields)
 */
const validateDataset = (req, res, next) => {
  const { id, instruction, metadata } = req.body;

  if (!id) {
    return next(createError(400, 'Dataset id is required'));
  }
  if (!instruction) {
    return next(createError(400, 'Dataset instruction is required'));
  }

  if (metadata !== undefined && typeof metadata !== 'object') {
    return next(createError(400, 'Metadata must be an object'));
  }

  if (metadata) {
    const allowedFields = ['type', 'repo_name', 'source_type', 'code_element'];
    for (const key of Object.keys(metadata)) {
      if (!allowedFields.includes(key)) {
        return next(createError(400, `Invalid metadata field: ${key}`));
      }
      if (typeof metadata[key] !== 'string') {
        return next(createError(400, `Metadata field '${key}' must be a string`));
      }
    }
  }

  next();
};

/**
 * Validate auth registration (and login) payload.
 * Requirements:
 *   - email format
 *   - password minimum length 6
 */
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !emailRegex.test(email)) {
    return next(createError(400, 'Invalid email address'));
  }
  if (!password || password.length < 6) {
    return next(createError(400, 'Password must be at least 6 characters'));
  }

  next();
};

module.exports = {
  validateDataset,
  validateAuth,
};
