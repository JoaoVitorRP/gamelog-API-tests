import prisma from "../src/database/db.js";

async function main() {
  await prisma.platforms.createMany({
    data: [
      {
        platform: "Steam",
      },
      {
        platform: "Epic Games Launcher",
      },
      {
        platform: "Ubisoft Connect",
      },
      {
        platform: "Playstation 5",
      },
      {
        platform: "Xbox Series S",
      },
    ],
  });

  await prisma.genres.createMany({
    data: [
      {
        genre: "Aventura",
      },
      {
        genre: "Tiro",
      },
      {
        genre: "Corrida",
      },
      {
        genre: "Mundo Aberto",
      },
      {
        genre: "Estratégia",
      },
      {
        genre: "Plataforma",
      },
    ],
  });

  await prisma.games.createMany({
    data: [
      {
        title: "Grand Theft Auto V",
        playtime: 37572,
        genre_id: 4,
        platform_id: 1,
      },
      {
        title: "Stardew Valley",
        playtime: 7628,
        genre_id: 1,
        platform_id: 1,
      },
      {
        title: "Fall Guys",
        playtime: 11466,
        genre_id: 6,
        platform_id: 2,
      },
      {
        title: "Teardown",
        playtime: 2940,
        genre_id: 4,
        platform_id: 1,
      },
      {
        title: "BeamNG.drive",
        playtime: 9564,
        genre_id: 3,
        platform_id: 1,
      },
      {
        title: "Celeste",
        playtime: 3458,
        genre_id: 6,
        platform_id: 2,
      },
      {
        title: "Trackmania 2020",
        playtime: 20090,
        genre_id: 3,
        platform_id: 3,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed successfully applied");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
