const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_LIMIT_PER_PAGE = 0;

const getPagination =(query)=>{
   const page_num = Math.abs(parseInt(query.page)) || DEFAULT_PAGE_NUMBER;
   const limit_per_page = Math.abs(parseInt(query.limit)) || DEFAULT_LIMIT_PER_PAGE;
   console.log(page_num, limit_per_page);
   const skip = (page_num-1)*limit_per_page;

   return {
    skip,
    limit_per_page
   }
}

module.exports={
    getPagination
}