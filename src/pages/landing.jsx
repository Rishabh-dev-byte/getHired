import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center gap-10 sm:gap-16 py-8 sm:py-16 px-4 max-w-7xl mx-auto">

      {/* HERO SECTION */}
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-3xl sm:text-5xl lg:text-7xl tracking-tight py-4">
          Find Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6 mt-2">
            through
            <img
              src="/logo.svg"
              className="h-10 sm:h-16 lg:h-24"
              alt="Hirrd Logo"
            />
          </span>
        </h1>

        <p className="text-gray-300 mt-3 text-sm sm:text-lg max-w-xl mx-auto">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto">
        <Link to={"/jobs"} className="w-full sm:w-auto">
          <Button variant="blue" size="xl" className="w-full sm:w-auto">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"} className="w-full sm:w-auto">
          <Button variant="destructive" size="xl" className="w-full sm:w-auto">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* CAROUSEL */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-6"
      >
        <CarouselContent className="gap-6 sm:gap-16 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem
              key={id}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/6 flex justify-center"
            >
              <img
                src={path}
                alt={name}
                className="h-8 sm:h-12 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* BANNER */}
      <img
        src="/banner.png"
        className="w-full max-w-5xl rounded-lg shadow-md"
        alt="Banner"
      />

      {/* CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <Accordion type="multiple" className="w-full max-w-3xl">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </main>
  );
};

export default LandingPage;