import { useEffect, useState } from "react";
import { getLinkPreview } from "link-preview-js";

interface LinkPreviewData {
    title: string;
    description: string;
    image: string;
    siteName: string;
}

export default function LinkPreview({ url }: { url: string }) {
    const [preview, setPreview] = useState<LinkPreviewData | null>(null);

    useEffect(() => {
        async function fetchPreview() {
            try {
                const data = await getLinkPreview(url);

                // Check for the existence of fields in the returned object
                const previewData: LinkPreviewData = {
                    title: (data as any).title || "No Title Available",
                    description: (data as any).description || "No Description Available",
                    image:
                        (Array.isArray((data as any).images) && (data as any).images[0]) ||
                        "/placeholder-image.png", // Use the first image or a placeholder
                    siteName: (data as any).siteName || "Unknown Site",
                };

                setPreview(previewData);
            } catch (error) {
                console.error("Failed to fetch link preview:", error);
                setPreview({
                    title: "Preview Unavailable",
                    description: "We couldn't fetch a preview for this link.",
                    image: "/placeholder-image.png", // Use a generic placeholder image
                    siteName: "Unknown Site",
                });
            }
        }

        fetchPreview();
    }, [url]);

    if (!preview) return <p className="text-sm italic">Loading preview...</p>;

    return (
        <div className="mt-2 p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
            <img
                src={preview.image}
                alt={preview.title}
                className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold">{preview.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{preview.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Source: {preview.siteName}</p>
        </div>
    );
}
