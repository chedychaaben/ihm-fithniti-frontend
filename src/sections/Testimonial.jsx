import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Testimonial = () => {
  const feedback = [
    {
      desc: "**FiTheniti revolutionized** my daily commute! *The intuitive app design* makes carpooling effortless.\n\nI've connected with amazing people while reducing my carbon footprint. 10/10 would recommend!",
      img: "https://dummyimage.com/106x106",
      user: "Mohamed Ali",
      prof: "Content Creator"
    },
    {
      desc: "What *truly sets FiTheniti apart* is their **unmatched reliability**.\n\nMy morning stress disappeared when I could count on punctual rides every single day. Plus, the drivers are consistently friendly!",
      img: "https://dummyimage.com/106x106",
      user: "Mouna Gesmi",
      prof: "Social Media Manager"
    },
    {
      desc: "As a developer, I appreciate FiTheniti's **flawless technical execution**.\n\n*Real-time tracking* works perfectly, and I've never experienced app crashes. The clean UI makes every ride enjoyable!",
      img: "https://dummyimage.com/106x106",
      user: "Saleh Bouazizi",
      prof: "Backend Developer"
    },
    {
      desc: "**Safety first!** FiTheniti's *verified driver system* gave me peace of mind.\n\nNight rides feel secure, and the emergency button adds an extra layer of protection. Brilliant service!",
      img: "https://dummyimage.com/106x106",
      user: "Lina Ben Ammar",
      prof: "Graphic Designer"
    },
    {
      desc: "The *cost savings* with FiTheniti are **substantial**!\n\nI've cut my transportation expenses by 60% while meeting interesting professionals during shared rides. Win-win!",
      img: "https://dummyimage.com/106x106",
      user: "Omar Trabelsi",
      prof: "Financial Analyst"
    },
    {
      desc: "🚀 *Next-level convenience!* FiTheniti's **AI-powered matching** finds perfect routes.\n\nAs a busy parent, the 'School Run' feature saves me 2+ hours weekly. *Life-changing* app!",
      img: "https://dummyimage.com/106x106",
      user: "Amira Chennoufi",
      prof: "Pediatric Nurse"
    }
  ]
  return (
    <section className="text-muted-foreground container py-16 max-w-screen-xl body-font">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">What Pepole Say About Us</h2>
        <div className="flex flex-wrap -m-4">
          {feedback.map(t => 
            <div key={t.user} className="p-4 md:w-1/3 w-full">
              <div className="h-full border rounded-lg p-8 group hover:bg-primary hover:text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 mb-4" viewBox="0 0 975.036 975.036">
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">{t.desc}</p>
                <a className="inline-flex items-center">
                  <Avatar>
                    <AvatarImage src={t.img} />
                  </Avatar>
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-semibold text-foreground group-hover:text-primary-foreground">{t.user}</span>
                    <span className="text-sm">{t.prof}</span>
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
    </section>
  )
}

export default Testimonial