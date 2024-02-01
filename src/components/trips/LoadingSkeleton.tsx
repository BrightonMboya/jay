import { Skeleton } from "~/components/ui/Skeleton";


export default function LoadingSkeleton() {
  return (
    <section className="flex flex-col w-[90vw] justify-center">
      <div className="flex items-center justify-between border-2">
        <Skeleton className="h-4 w-[100px]" />
        
        <div>
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="flex min-h-screen w-[90vw] flex-col items-center justify-center space-x-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[100px]" />
          <div>
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[450px]" />
          <Skeleton className="h-4 w-[450px]" />
          <Skeleton className="h-4 w-[450px]" />
        </div>
      </div>
    </section>
  );
}
