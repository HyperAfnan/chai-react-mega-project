import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RealTimeEditor } from "../index.js";
import service from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
   const navigate = useNavigate();
   const userData = useSelector((state) => state.userData);
   const { register, handleSubmit, watch, setValue, control, getValues } =
      useForm({
         defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            statues: post?.status || "active",
         },
      });

   const submit = async (data) => {
      if (post) {
         const file = data?.image[0] ? service.uploadFile(data.image[0]) : null;
         if (file) {
            service.deleteFile(post.featuredImage);
         }
         const dbpost = await service.updatePost(post.$id, {
            ...data,
            featuredImage: file || file.$id || undefined,
         });
         if (dbpost) {
            navigate(`/post/${dbpost.$id}`);
         }
      } else {
         const file = data?.image[0]
            ? await service.uploadFile(data.image[0])
            : null;
         const dbpost = await service.createPost({
            ...data,
            featuredImage: file?.$id,
            userId: userData.$id,
         });
         if (dbpost) {
            navigate(`/post/${dbpost.$id}`);
         }
      }
   };

   const slugTransform = useCallback((value) => {
      const slug = value
         .trim()
         .toLowerCase()
         .replace(/[^a-z0-9]+/g, "-")
         .replace(/^-|-$/g, "");
      setValue("slug", slug);
      return slug;
   });

   useEffect(() => {
      const subscription = watch((value, { name }) => {
         if (name === "title") {
            setValue("slug", slugTransform(value.title, { shouldValidate: true }));
         }

         return () => {
            subscription.unsubscribe();
         };
      });
   }, [watch, slugTransform, setValue]);
   return (
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
         <div className="w-2/3 px-2">
            <Input
               label="Title :"
               placeholder="Title"
               className="mb-4"
               {...register("title", { required: true })}
            />
            <Input
               label="Slug :"
               placeholder="Slug"
               className="mb-4"
               {...register("slug", { required: true })}
               onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                     shouldValidate: true,
                  });
               }}
            />
            <RealTimeEditor
               label="Content :"
               name="content"
               control={control}
               defaultValue={getValues("content")}
            />
         </div>
         <div className="w-1/3 px-2">
            <Input
               label="Featured Image :"
               type="file"
               className="mb-4"
               accept="image/png, image/jpg, image/jpeg, image/gif"
               {...register("image", { required: !post })}
            />
            {post && (
               <div className="w-full mb-4">
                  <img
                     src={service.getFilePreview(post.featuredImage)}
                     alt={post.title}
                     className="rounded-lg"
                  />
               </div>
            )}
            <Select
               options={["active", "inactive"]}
               label="Status"
               className="mb-4"
               {...register("status", { required: true })}
            />
            <Button
               type="submit"
               bgColor={post ? "bg-green-500" : undefined}
               className="w-full"
            >
               {post ? "Update" : "Submit"}
            </Button>
         </div>
      </form>
   );
};

export default PostForm;
