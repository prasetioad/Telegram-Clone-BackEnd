const paginate = (page, perPage, mode)=>{
    const limit = perPage ? + perPage : 5;
    const offset = page ? + page * limit : 0;
    if(mode === undefined){
        const sort = 'DESC'
        return {limit, offset, sort}
    }else{
        const sort = mode
        return {limit, offset, sort}
    }
    
}

module.exports = paginate