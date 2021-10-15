import React, { useState, useEffect } from "react";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

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
    <main className="bg-blue-100 p-12">
      <div className="p-20 lg:pt-36 container mx-auto relative">
        <section className="bg-blue-300 rounded-lg shadow-4xl lg:flex p-40">
          <img
            src={urlFor(author.authorImage).url()}
            alt={author.name}
            className="rounded w-32 h-48 lg:w-48 lg:h-64 mr-8"
          />
          <div className="text-lg flex flex-col justified-center">
            <h1 className="cursive text-6xl text-green-300 mb-4">
              {" "}
              <span className="text-blue-100">{author.name}</span>
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
