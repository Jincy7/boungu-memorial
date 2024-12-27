import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 샘플 태그 생성
  const tag1 = await prisma.tag.create({
    data: {
      title: 'Nature',
      description: 'Images and videos related to nature',
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      title: 'Technology',
      description: 'Content related to technology',
    },
  });

  // 샘플 미디어 메타데이터 생성
  await prisma.mediaMetadata.create({
    data: {
      timestamp: new Date(),
      title: 'Sunset over the mountains',
      description: 'A beautiful sunset over the mountains',
      mediaSrc: 'https://example.com/sunset.jpg',
      type: 'image',
      mediaTags: {
        create: [
          {
            tag: {
              connect: { id: tag1.id },
            },
          },
        ],
      },
    },
  });

  await prisma.mediaMetadata.create({
    data: {
      timestamp: new Date(),
      title: 'Latest Tech Trends',
      description: 'An article about the latest trends in technology',
      mediaSrc: 'https://example.com/tech-trends.mp4',
      type: 'video',
      mediaTags: {
        create: [
          {
            tag: {
              connect: { id: tag2.id },
            },
          },
        ],
      },
    },
  });

  console.log('샘플 데이터가 성공적으로 삽입되었습니다.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });