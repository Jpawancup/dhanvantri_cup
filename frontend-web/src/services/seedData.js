import { saveData } from "./storageService"

export const seedAppData = () => {
  if (typeof window === "undefined") return
  if (localStorage.getItem("seeded")) return

  // USERS
  const users = [
    {
      id: "u1",
      name: "Pawan",
      role: "patient",
      email: "pawan@gmail.com",
      password: "1234",
      profileImage: "/images/profiles/user1.jpg"
    }
  ]

  // POSTS
  const posts = Array.from({ length: 9 }).map((_, i) => ({
    id: "post" + i,
    userId: "u1",
    content: "Health tip " + i,
    image: `/images/social/posts/post${i + 1}.png`,
    likes: []
  }))

  // REELS
  const reels = Array.from({ length: 13 }).map((_, i) => ({
    id: "reel" + i,
    userId: "u1",
    video: `/images/social/reels/reel${i + 1}.mp4`,
    likes: []
  }))

  // HOSPITALS
  const hospitals = [
    {
      id: "h1",
      name: "Apollo Hospital",
      images: [
        "/images/hospitals/h1.jpg",
        "/images/hospitals/h2.jpg"
      ]
    }
  ]

  saveData("users", users)
  saveData("posts", posts)
  saveData("reels", reels)
  saveData("hospitals", hospitals)

  localStorage.setItem("seeded", "true")
}
