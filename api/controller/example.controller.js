const securedExample = async (req, res) => {
    console.log("Something that needs authentication has been done.");
    return res.status(200).json({ message: 'This is a secure endpoint' });
}
export default{ securedExample };