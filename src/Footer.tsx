import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
}

interface FooterProps {
  social: ReadonlyArray<SocialLink>;
}

export default function Footer({ social }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 1 }}>
        {social.map((network) => (
          <IconButton
            key={network.name}
            aria-label={network.name}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            <network.icon />
          </IconButton>
        ))}
      </Stack>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Gigi Fok. All rights reserved.
      </Typography>
    </Box>
  );
}
