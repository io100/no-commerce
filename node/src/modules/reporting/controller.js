export async function getUsersForDateRange(ctx) {

  const { from, to, uaid, status, page, limit } = ctx.request.body;
  let pagesize = page !== null ? limit || 20 : null, users, total;
  // We're making timestamps into Mongo IDs to look.
  const fromObjectID = new Date(new Date(from).toISOString());
  const toObjectID = new Date(new Date(to).toISOString());

  const query = {
   _id: {
      "$gt": ObjectID(objectIdFromDate(fromObjectID)),
      "$lt": ObjectID(objectIdFromDate(toObjectID))
    }
  };

  if(status) {
    query.status = status;
  }
  if(uaid) {
    // Check if this is an email, if so let's look up the user acquisition id by email
    if(~uaid.indexOf('@')) {
      const userAcquisitionIDFromEmail =  await User.find({"email": uaid})
      query.userAcquisition = userAcquisitionIDFromEmail[0]._id
    } else {
      query.userAcquisition = uaid
    }
  }

  if(!page) {
     users = await User.find(query, '-password')
     total = users.length
  } else if (page === 1) {
     total = await User.find(query).count()
     users = await User.find(query, '-password').limit(pagesize)
  } else if (page > 1) {
     total = await User.find(query).count()
     users = await User.find(query, '-password').skip(pagesize*(page-1)).limit(pagesize)
  }

  // Spread operator love for results.
  const result = {
    currentPage: page !== null ? page : 1,
    totalPages: page !== undefined ? Math.floor(total / pagesize) : 1,
    resultsOnPage: users.length,
    totalResults: total,
    results: [
      ...users
    ]
  };

    ctx.body = result;

}
