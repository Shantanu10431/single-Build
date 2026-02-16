import RBLayoutShell from '@/modules/resume/components/layout/RBLayoutShell';

export default function RBLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RBLayoutShell>
            {children}
        </RBLayoutShell>
    );
}
