import React, { useEffect, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud, FiX } from "react-icons/fi"

const MultiUpload = ({ name, setValue, register, label, viewData = [], errors }) => {
    const [selectedFiles, setSelectedFiles] = useState([])
    const [previewSources, setPreviewSources] = useState([])
    
    // useRef to track if we've already loaded the initial data
    const initialDataLoaded = useRef(false);

    // 1. SYNC INITIAL DATA ONLY ONCE
    useEffect(() => {
        if (viewData && Array.isArray(viewData) && viewData.length > 0 && !initialDataLoaded.current) {
            setPreviewSources(viewData);
            initialDataLoaded.current = true; // Mark as loaded so this never triggers a loop
        }
    }, [viewData]);

    const onDrop = (acceptedFiles) => {
        setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
        
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreviewSources((prev) => [...prev, reader.result]);
            };
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [".jpeg", ".jpg", ".png"] },
        onDrop,
    })

    const removeImage = (index) => {
    // 1. Get the item we are about to remove
    const imageToRemove = previewSources[index];
    
    // 2. Update the UI Previews immediately
    const updatedPreviews = previewSources.filter((_, i) => i !== index);
    setPreviewSources(updatedPreviews);

    // 3. Identify if it's an existing URL (from DB) or a new File (newly uploaded)
    const isUrl = typeof imageToRemove === 'string' && imageToRemove.startsWith('http');

    if (isUrl) {
        // REMOVING EXISTING IMAGE:
        // Filter the 'viewData' coming from the parent to remove this specific URL
        const updatedExistingUrls = viewData.filter((url) => url !== imageToRemove);
        
        // Sync the Form State: existing URLs + any new files the user added
        setValue(name, [...updatedExistingUrls, ...selectedFiles], { 
            shouldDirty: true, 
            shouldValidate: true 
        });
    } else {
        // REMOVING NEWLY DROPPED FILE:
        // We need to find its index inside the 'selectedFiles' array
        // (Calculated by: total index minus the number of URLs currently shown)
        const urlCount = previewSources.filter(s => typeof s === 'string' && s.startsWith('http')).length;
        const fileIndex = index - urlCount;
        
        const updatedFiles = selectedFiles.filter((_, i) => i !== fileIndex);
        setSelectedFiles(updatedFiles);

        // Sync the Form State: all existing URLs + the remaining new files
        setValue(name, [...(viewData || []), ...updatedFiles], { 
            shouldDirty: true, 
            shouldValidate: true 
        });
    }
};

    useEffect(() => {
        register(name, {
            required: (viewData?.length || 0) + selectedFiles.length === 0
        })
    }, [register, name, viewData, selectedFiles]);

    // 2. THE LOOP BREAKER: Only update the form when NEW files are actually added
    useEffect(() => {
        if (selectedFiles.length > 0) {
            const currentExisting = Array.isArray(viewData) ? viewData : [];
            setValue(name, [...currentExisting, ...selectedFiles], {
                shouldValidate: true,
                shouldDirty: true
            });
        }
        // Removed viewData from dependency array to stop the bounce-back loop
    }, [selectedFiles, name, setValue]);

    return (
        <div className='flex flex-col space-y-4'>
            <label className="text-sm text-gray-5">
                {label} <sup className='text-pink-200'>*</sup>
            </label>

            {previewSources.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600">
                    {previewSources.map((source, index) => (
                        <div key={index} className="relative min-w-[150px] h-[100px]">
                            <img
                                src={source}
                                alt={`preview-${index}`}
                                className='h-full w-full rounded-md object-cover border border-gray-600'
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                            >
                                <FiX size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div
                {...getRootProps()}
                className={`${isDragActive ? "bg-gray-600" : "bg-gray-700"} flex min-h-[150px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-gray-500`}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center p-6">
                    <div className="grid aspect-square w-12 place-items-center rounded-full bg-pure-greys-800">
                        <FiUploadCloud className='text-2xl text-yellow-50' />
                    </div>
                    <p className="mt-2 text-center text-sm text-gray-200">
                        Drag & Drop or <span className='font-semibold text-yellow-50'>Browse</span> multiple images
                    </p>
                </div>
            </div>

            {errors?.[name] && (
                <span className="ml-2 text-xs text-pink-200">
                    At least one {label} is required
                </span>
            )}
        </div>
    )
}

export default MultiUpload