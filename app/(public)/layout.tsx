const PublicLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full dark:bg-[#1F!F!F]">
            {children}
        </div>
    );
}

export default PublicLayout;