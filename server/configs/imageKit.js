import ImageKit from '@imagekit/nodejs';

export default client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});