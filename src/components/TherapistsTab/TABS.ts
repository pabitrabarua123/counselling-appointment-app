type TabItem = {
  id: number
  name: string
  image: string
  degree: string
  areas: string[]
  description: string
}

export const TABS: TabItem[] = [
  {
    id: 0,
    name: "Tab One",
    image: "https://res.cloudinary.com/dnuahwi2j/image/upload/v1764661287/doc1_cvauzy.png",
    degree: "First Feature",
    areas: ["This is area one.", "This is area two."],
    description: "This is the description for the first feature."
  },
  {
    id: 1,
    name: "Tab Two",
    image: "https://res.cloudinary.com/dnuahwi2j/image/upload/v1764661355/doc2_k3gkbs.png",
    degree: "Second Feature",
    areas: ["This is area one.", "This is area two."],
    description: "This is the description for the second feature."
  },
  {
    id: 2,
    name: "Tab Three",
    image: "https://res.cloudinary.com/dnuahwi2j/image/upload/v1764661287/doc1_cvauzy.png",
    degree: "Third Feature",
    areas: ["This is area one.", "This is area two."],
    description: "This is the description for the third feature."
  },
  {
    id: 3,
    name: "Tab Four",
    image: "https://res.cloudinary.com/dnuahwi2j/image/upload/v1764661355/doc2_k3gkbs.png",
    degree: "Fourth Feature",
    areas: ["This is area one.", "This is area two."],
    description: "This is the description for the fourth feature."
  }
]
