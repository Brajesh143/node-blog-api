const { getBlogs } = require('../controller/blog');
const Blog = require('../model/blog');

jest.mock('../model/blog'); // Mock the Blog model

describe('Test blog functionality', () => {
    it('Test get all blogs functionality', async () => {
        const req = { query: { page: '1', limit: '5' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();

        // Mock the blog data and total count
        const mockBlogs = [
            {
                title: "test blog title1",
                category: "test category1",
                description: "test description1",
                author: "Author 1",
                image: null
            },
            {
                title: "test blog title2",
                category: "test category2",
                description: "test description2",
                author: "Author 2",
                image: null
            }
        ];

        const mockTotalBlogs = 2;

        // Mock Blog.find to return the mockBlogs array
        Blog.find.mockResolvedValue(mockBlogs);

        // Mock Blog.countDocuments to return the mockTotalBlogs count
        Blog.countDocuments.mockResolvedValue(mockTotalBlogs);

        // Call the getBlogs handler
        await getBlogs(req, res, next);

        // Check if res.status was called
        console.log('res.status calls:', res.status.mock.calls);  // Log to see if it's being called

        // Check if Blog.find was called
        console.log('Blog.find calls:', Blog.find.mock.calls);  // Log to see if Blog.find was called

        // Check if Blog.countDocuments was called
        console.log('Blog.countDocuments calls:', Blog.countDocuments.mock.calls);  // Log to see if Blog.countDocuments was called

        // Assert that res.status was called with 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Assert that res.json was called with the correct structure
        expect(res.json).toHaveBeenCalledWith({
            message: 'Blog lists',
            data: mockBlogs,
            total: mockTotalBlogs
        });
    });
});
