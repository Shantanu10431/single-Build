import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = React.forwardRef<
    HTMLDialogElement,
    React.DialogHTMLAttributes<HTMLDialogElement> & { isOpen: boolean; onClose: () => void }
>(({ className, isOpen, onClose, children, ...props }, ref) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null)

    React.useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal()
            document.body.style.overflow = 'hidden'
        } else {
            dialogRef.current?.close()
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    return (
        <dialog
            ref={dialogRef}
            className={cn(
                "backdrop:bg-black/50 backdrop:backdrop-blur-sm fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 rounded-lg shadow-xl bg-background border border-muted w-full max-w-2xl max-h-[85vh] overflow-y-auto outline-none",
                className
            )}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === dialogRef.current) onClose()
            }}
            {...props}
        >
            <div className="relative p-6">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                {children}
            </div>
        </dialog>
    )
})
Dialog.displayName = "Dialog"

export { Dialog }
