import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import image from "../stlsymbol.png";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function About() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return <div>Loading again....</div>;

  return (
    <main className="relative">
      <img src={image} alt="Plumeria Flower" className="absolute w-full" />
      <div className="p-10 lg:pt-48 container mx-auto relative">
        <section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
          <img
            src={urlFor(author.authorImage).url()}
            alt={author.name}
            className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
          />
          <div className="text-lg flex flex-col justified-center">
            <h1 className="cursive text-6xl text-green-300 mb-4">
              Booo BlackHawks{" "}
              <span className="text-green-100">{author.name}</span>
            </h1>
            <div>
              <BlockContent
                block={author.bio}
                projectId="7cv6ef0b"
                dataset="production"
              ></BlockContent>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
