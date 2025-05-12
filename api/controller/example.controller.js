const securedExampleProcess = async (req, res) => {
    console.log("Something that needs authetication was run here");
    return res.status(200).json({ message: 'This is a secured endpoint' });
};

export default { securedExampleProcess: securedExampleProcess };