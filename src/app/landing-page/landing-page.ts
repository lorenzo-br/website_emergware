import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { FormsModule } from '@angular/forms';
import 'zone.js';
import { EmailService } from '../email.service';

Swiper.use([Navigation, Autoplay]);

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
 // styleUrls: ['./landing-page.css'] // se quiser separar, ou use styles.scss
})
export class LandingPageComponent implements AfterViewInit {
  public showMobileMenu = false;
  public loading = false;
  public successMessage = '';
  public errorMessage = '';
  public swiper: Swiper | undefined;

  constructor(private emailService: EmailService) {}

  services = [
    {
      title: 'Análise Preditiva',
      description: 'Modelos de machine learning para prever tendências e comportamento.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ...>...</svg>`
    },
    {
      title: 'Processamento de Linguagem Natural',
      description: 'Chatbots, análise de sentimentos e extração de informações.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ...>...</svg>`
    },
    {
      title: 'Visão Computacional',
      description: 'Reconhecimento de imagem, detecção de objetos e vídeo.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ...>...</svg>`
    },
    {
      title: 'Automação Inteligente',
      description: 'RPA e agentes inteligentes para automatizar processos.',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ...>...</svg>`
    }
  ];
  
  sectors = [
    {
      title: 'Geologia e Mineração',
      description: 'Análise de imagens de satélite e dados sísmicos para identificar depósitos minerais e otimizar a exploração de recursos.',
      image: 'https://i.imgur.com/HhhnLbD.jpg'
    },
    {
      title: 'Petróleo e Gás',
      description: 'Modelos preditivos para otimizar a perfuração de poços, prever a produção e aumentar a segurança operacional.',
      image: 'https://i.imgur.com/iV5lRI5.jpg'
    },
    {
      title: 'Micropaleontologia',
      description: 'Classificação automatizada de microfósseis usando visão computacional para acelerar análises bioestratigráficas.',
      image: 'https://i.imgur.com/pbPUg2Q.jpg'
    },
    {
      title: 'Agricultura de Precisão',
      description: 'Análise de dados de drones e sensores para monitorar a saúde das culturas, otimizar o uso de insumos e prever safras.',
      image: 'https://i.imgur.com/POHXqyF.jpg'
    },
    {
      title: 'Laboratório',
      description: 'Automação da análise de amostras e interpretação de resultados, garantindo maior precisão e rastreabilidade.',
      image: 'https://i.imgur.com/WQrC03w.jpg'
    }
  ];

  ngAfterViewInit(): void {
    const sections = document.querySelectorAll('.fade-in-section');
    this.setupFadeInAnimation();
    this.initializeSwiper();
    console.log('showMobileMenu' + this.showMobileMenu);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
    console.log('showMobileMenu' + this.showMobileMenu);
  }

  scrollTo(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private initializeSwiper(): void {
    this.swiper = new Swiper('.swiper', {
      // Ativa o loop infinito
      loop: true,
      
      // Espaçamento entre os slides
      spaceBetween: 30,

      // Autoplay (opcional, mas interessante)
      autoplay: {
        delay: 5000,
        disableOnInteraction: true,
      },

      // Quantidade de slides visíveis por breakpoint (responsividade)
      slidesPerView: 1,
      breakpoints: {
        // Quando a tela for >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // Quando a tela for >= 768px
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // Quando a tela for >= 1024px
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      
      // Habilita os botões de navegação
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  private setupFadeInAnimation(): void {
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.emailService.sendForm(
      'service_fvr7399',
      'template_bllurfo',
      event.target as HTMLFormElement,
      'vjsgW23ENn4ScZiuA'
    ).then(
      (result) => {
        this.successMessage = 'Mensagem enviada com sucesso!';
        (event.target as HTMLFormElement).reset();
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erro ao enviar a mensagem. Tente novamente mais tarde.';
        console.error(error);
        this.loading = false;
      }
    );
  }
}