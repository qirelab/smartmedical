'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  Phone,
  LocationOn,
  Email,
  ArrowForward,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Компонент для изображения с fallback
function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1080}
      height={400}
      className={className}
      style={{ objectFit: 'cover' }}
    />
  );
}

export default function ContactsSection() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Box component="section" sx={{ py: { xs: 6, lg: 10 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, lg: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', lg: '3rem' },
              color: 'text.primary',
              mb: 3,
              fontWeight: 600,
            }}
          >
            Готовы позаботиться о своём здоровье?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', lg: '1.25rem' },
              maxWidth: '48rem',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Запишитесь на консультацию прямо сейчас и получите профессиональную медицинскую помощь
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
            gap: { xs: 4, lg: 6 },
            alignItems: 'start',
          }}
        >
          {/* Contact Info */}
          <Box>
            <Stack spacing={3}>
              {/* Contact Details */}
              <Stack spacing={3}>
                <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'text.primary',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Phone sx={{ color: 'primary.main', fontSize: 20 }} />
                      Телефон
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                      +375 29 161-01-01
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Ежедневно с 9:00 до 21:00
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'text.primary',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <LocationOn sx={{ color: 'primary.main', fontSize: 20 }} />
                      Адрес
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                      г. Минск, пр. Победителей, д. 119, пом. 504
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Легко добраться на транспорте
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'text.primary',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Email sx={{ color: 'primary.main', fontSize: 20 }} />
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
                      smartmedical.by@gmail.com
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Ответим в течение 24 часов
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>

              {/* CTA Button */}
              <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleNavigation('/contacts')}
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'primary.main',
                    px: 4,
                    py: 2,
                    fontSize: '1.125rem',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  Записаться сейчас
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Location & Image */}
          <Box>
            <Stack spacing={3}>
              {/* Office Image */}
              <Card sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                <ImageWithFallback
                  src=""
                  alt="Doctor Family Clinic Building"
                  className="w-full h-64 lg:h-72"
                />
              </Card>

              {/* Map placeholder */}
              <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <LocationOn sx={{ fontSize: 48, color: 'primary.main' }} />
                  </Box>
                  <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>
                    Удобное расположение
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    Клиника находится в самом центре Минска, рядом с метро и остановками общественного транспорта
                  </Typography>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => handleExternalLink('https://maps.google.com')}
                    endIcon={<ArrowForward />}
                    sx={{
                      border: '2px solid',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      px: 4,
                      py: 2,
                      fontSize: '1.125rem',
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    Показать на карте
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}