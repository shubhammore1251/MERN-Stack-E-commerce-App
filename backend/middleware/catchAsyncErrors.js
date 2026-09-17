module.exports = Func => (req,res,next) => {
    Promise.resolve(Func(req, res, next)).catch(err => {
        console.log("Error caught in catchAsyncErrors middleware:", err);
        next(err);
    });
}