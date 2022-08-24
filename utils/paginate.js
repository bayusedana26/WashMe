module.exports.paginate = async (
  model,
  attributes,
  filter,
  order,
  pageSize,
  pageLimit,
) => {
  try {
    const limit = parseInt(pageLimit, 10) || 10;
    const page = parseInt(pageSize, 10) || 1;

    let options = {
      attributes: attributes,
      where: filter,
      order: order,
      offset: getOffset(page, limit),
      limit: limit, 
    };

    let { count, rows } = await model.findAndCountAll(options);

    return {
      total_data: count,
      total_page: getTotalPage(count, limit),
      limit: limit,
      currentPage: page,
      previousPage: getPreviousPage(page),
      nextPage: getNextPage(page, limit, count),
      data: rows,
    };
  } catch (error) {
    console.log(error);
  }
};

const getTotalPage = (count, limit) => {
  let totalPage;
  count % limit == 0 ? totalPage = count/limit : totalPage = parseInt(count/limit) + 1

  return totalPage;
}

const getOffset = (page, limit) => {
  return page * limit - limit;
};

const getNextPage = (page, limit, total) => {
  if (total / limit > page) {
    return page + 1;
  }

  return null;
};

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};
