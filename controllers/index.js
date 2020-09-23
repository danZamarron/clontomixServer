exports.getIndexAPI = async (req, res, next) =>
{
    return res.status(200).json("Testing Index API")
}