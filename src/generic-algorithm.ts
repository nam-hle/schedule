export interface Chromosome {
  fitness(): number;
  mutate(): Chromosome;
  crossover(other: Chromosome): Chromosome;
}

/**
 * A generic genetic algorithm.
 */
export interface GeneticAlgorithmConfig {
  readonly populationSize: number;
  readonly mutationRate: number;
  readonly crossoverRate: number;
  readonly elitismCount: number;
  readonly maxIterations: number;
}

export class GeneticAlgorithm {
  private population: Chromosome[];
  private readonly config: GeneticAlgorithmConfig;

  constructor(initialPopulation: Chromosome[], config: GeneticAlgorithmConfig) {
    this.population = initialPopulation;
    this.config = config;
  }

  /**
   * Select a random chromosome based on its fitness.
   */
  private select(): Chromosome {
    const totalFitness = this.population.reduce((s, c) => s + c.fitness(), 0);
    const randomFitness = Math.random() * totalFitness;
    let fitness = 0;
    for (const chromosome of this.population) {
      fitness += chromosome.fitness();
      if (fitness >= randomFitness) {
        return chromosome;
      }
    }
    return this.population[0];
  }

  /**
   * Apply crossover to a pair of chromosomes.
   */
  private crossover(
    chromosome1: Chromosome,
    chromosome2: Chromosome
  ): Chromosome[] {
    if (Math.random() < this.config.crossoverRate) {
      return [
        chromosome1.crossover(chromosome2),
        chromosome2.crossover(chromosome1),
      ];
    }
    return [chromosome1, chromosome2];
  }

  /**
   * Apply mutation to a chromosome
   */
  private mutate(chromosome: Chromosome): Chromosome {
    if (Math.random() < this.config.mutationRate) {
      return chromosome.mutate();
    }
    return chromosome;
  }

  /**
   * Main function of the algorithm.
   * While iteration is smaller than maxIterations,
   * perform crossover two each pair of current population,
   * mutate each of them, and add them to the next population.
   */
  public run(): Chromosome[] {
    let iteration = 0;
    while (iteration < this.config.maxIterations) {
      const nextPopulation: Chromosome[] = [];
      for (let i = 0; i < this.config.populationSize; i++) {
        const chromosome1 = this.select();
        const chromosome2 = this.select();
        const [c1, c2] = this.crossover(chromosome1, chromosome2);
        nextPopulation.push(this.mutate(c1));
        nextPopulation.push(this.mutate(c2));
      }
      this.population = nextPopulation;
      iteration++;
    }
    return this.population;
  }
}
