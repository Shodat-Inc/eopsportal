export async function paginateQuery(model: any, page: number, pageSize: number, queryOptions = {}) {
    const offset = (page - 1) * pageSize;
    const result = await model.findAndCountAll({
        ...queryOptions,
        limit: Number(pageSize),
        offset: offset
    });
    const totalItems = result.rows.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
        rows: result.rows
    };
}
