import { Box, Card, Flex, Skeleton, } from "@radix-ui/themes";

export default function LoadingIssueDetailPage() {
    return (
        <Box className="max-w-3xl">
            <Skeleton height="2rem" width="50%" />
            <Flex gap="3" my="2">
                <Skeleton width="40px" />
                <Skeleton width="100px" />
            </Flex>
            <Card className="prose mt-4">

                <Skeleton mt="4" height="200px" />
            </Card>
        </Box>
    );
}