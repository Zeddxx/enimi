import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ShowMoreModal = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="underline underline-offset-2 text-sm cursor-pointer">
          show more
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-3xl text-primary">{title}</DialogTitle>
          <DialogDescription>
            <span
              className=""
              dangerouslySetInnerHTML={{ __html: description }}
            ></span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ShowMoreModal;
