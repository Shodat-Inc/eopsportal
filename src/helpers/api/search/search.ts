import { Op } from 'sequelize';

/**
 * Generalized search function for Sequelize.
 * 
 * @param model - Sequelize model to search in.
 * @param fields - Fields in the model to search. Can be a single field or an array of fields.
 * @param query - Search query.
 */
export async function generalizedSearch(model: any, fields: string | string[], query: string | string[]) {
  // If fields is a string, convert it to an array for consistency.
  if (typeof fields === 'string') {
    fields = [fields];
  }

  const searchCriteria = fields.map(field => ({
    [field]: {
      [Op.like]: `%${query}%`
    }
  }));

  return await model.findAll({
    where: {
      [Op.or]: searchCriteria
    }
  });
}
